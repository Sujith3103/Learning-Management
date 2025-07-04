const Order = require("../../models/Order")
const paypal = require("../../helpers/paypal")
const StudentCourses = require("../../models/StudentCourse")
const Course = require("../../models/Course")
const StudentCourse = require("../../models/StudentCourse")



const createOrder = async (req, res) => {

    try {
        const {
            userId, userName, userEmail, orderStatus, paymentMethod, paymentStatus, orderDate, paymentId, payerId, instructorId, instructorName, courseImage, courseTitle, courseId, coursePricing, } = req.body

        const create_paypal_json = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal'
            },
            redirect_urls: {
                return_url: "http://localhost:5173/payment-return",
                cancel_url: "http://localhost:5173/payment-cancel",

            },
            transactions: [
                {
                    item_list: {
                        items: [
                            {
                                name: courseTitle,
                                sku: courseId,
                                price: coursePricing,
                                currency: 'USD',
                                quantity: 1
                            }
                        ]
                    },
                    amount: {
                        currency: 'USD',
                        total: coursePricing.toFixed(2)
                    },
                    description: courseTitle
                }
            ]

        }

        paypal.payment.create(create_paypal_json, async (error, paymentInfo) => {
            if (error) {
                console.log("PAYPAL ERROR FULL DUMP: ", JSON.stringify(error, null, 2));
                return res.status(500).json({
                    success: false,
                    message: "error while creating paypal payment"
                });
            }
            else {
                const newlyCreatedCourseOrder = new Order({
                    userId, userName, userEmail, orderStatus, paymentMethod, paymentStatus, orderDate, paymentId, payerId, instructorId, instructorName, courseImage, courseTitle, courseId, coursePricing,

                })

                await newlyCreatedCourseOrder.save()
                const approvalLink = paymentInfo.links.find(link => link.rel === 'approval_url');

                if (!approvalLink) {
                    return res.status(500).json({
                        success: false,
                        message: "Could not get approval URL from PayPal",
                    })
                }

                res.status(200).json({
                    success: true,
                    message: "Payment created successfully",
                    data: {
                        approvalUrl: approvalLink.href,
                        orderId: newlyCreatedCourseOrder._id
                    }
                });
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            messaage: "order was not created"
        })
    }
}
const capturePaymentAndFinalizeOrder = async (req, res) => {
    try {
        const { paymentId, payerId, orderId } = req.body;
        console.log("req.body is: ", req.body);

        let order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order was not found",
            });
        }

        order.paymentStatus = "paid";
        order.orderStatus = "confirmed";
        order.paymentId = paymentId;
        order.payerId = payerId;
        await order.save();

        const studentCourses = await StudentCourse.findOne({ userId: order.userId });
        if (studentCourses) {
            studentCourses.courses.push({
                courseId: order.courseId,
                title: order.courseTitle,
                instructorId: order.instructorId,
                instructorName: order.instructorName,
                dateOfPurchase: order.orderDate,
                courseImage: order.courseImage,
            });
            await studentCourses.save();
        } else {
            const newStudentCourse = new StudentCourse({
                userId: order.userId,
                courses: [
                    {
                        courseId: order.courseId,
                        title: order.courseTitle,
                        instructorId: order.instructorId,
                        instructorName: order.instructorName,
                        dateOfPurchase: order.orderDate,
                        courseImage: order.courseImage,
                    },
                ],
            });
            await newStudentCourse.save();
        }

        // ADD to Course.students:
        await Course.findByIdAndUpdate(order.courseId, {
            $addToSet: { students: order.userId },
        });

        res.status(200).json({
            success: true,
            message: "Payment captured successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Could not capture payment",
        });
    }
};


module.exports = { createOrder, capturePaymentAndFinalizeOrder }