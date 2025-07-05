import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import VideoPlayer from "@/components/video_player";
import { onGooglePayButtonClicked } from "@/config/payment_gateway";
import { AuthContext } from "@/context/auth_context";
import { StudentContext } from "@/context/student_context";
import { createPaymentService, getCourseById } from "@/services";
import { CircleCheck, CirclePlay, Globe, Lock } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CourseDetails = () => {

    const navigate = useNavigate()

    const { auth } = useContext(AuthContext)
    const { studentBoughtCoursesData, setstudentBoughtCoursesData } = useContext(StudentContext)

    const [courseData, setCourseData] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogUrl, setDialogUrl] = useState(null)

    const [approvalUrl, setApprovalUrl] = useState("")


    const handleCreatePayment = async () => {
        try {
            const paymentPayload = {
                userId: auth?.user?.id,
                userName: auth?.user?.userName,
                userEmail: auth?.user?.userEmail,
                orderStatus: 'pending',
                paymentMethod: 'paypal',
                paymentStatus: 'initiated',
                orderDate: new Date(),
                paymentId: '',
                payerId: '',
                instructorId: courseData?.instructor?._id,
                instructorName: courseData?.instructor?.userName,
                courseImage: courseData?.image,
                courseTitle: courseData?.title,
                courseId: courseData?._id,
                coursePricing: courseData?.pricing,
            };

            console.log("payment load:", paymentPayload)
            const response = await createPaymentService(paymentPayload);
            console.log("create payment response: ", response);

            if (response.success) {
                sessionStorage.setItem('currentOrderId', JSON.stringify(response.data.orderId))
                setApprovalUrl(response?.data?.approvalUrl)
            }
            // [            window.location.href = response.data.approveUrl.href;]
        } catch (err) {
            console.error("Payment creation failed", err);
        }

    };



    const course_title = courseData?.title ? courseData.title.split(" ") : ["", ""];

    const handleClick = (data) => {
        if (data.freePreview) {
            setDialogUrl(data.videoUrl)
            setIsDialogOpen(prev => !prev)
        }
    }

    const checkBoughtCourses = (id) => {
        console.log("Student bought : ", studentBoughtCoursesData)
    }

    // building the items
    const items = [
        `${course_title[0]} ${course_title[1]} full course 2025`,
        `${course_title[0]} ${course_title[1]} full course 2025`,
        `${course_title[0]} ${course_title[1]} full course 2025`,
        `${course_title[0]} ${course_title[1]} full course 2025`,
    ];

    const dateOnly = courseData?.createdAt
        ? new Date(courseData.createdAt).toISOString().split("T")[0]
        : null;
    const { id } = useParams();
    useEffect(() => {
        async function fetchData() {
            try {
                if (id !== undefined) {
                    const response = await getCourseById(id);
                    setCourseData(response.data.data);
                }

            } catch (error) {
                console.error("Error fetching course", error);
            }
        }
        fetchData();
        checkBoughtCourses(id)
    }, [id]);


    //to check if the course is already bought
    useEffect(() => {
        const exists = studentBoughtCoursesData.some(course => course.courseId === id);
        console.log("Exists: ", exists);  // true or false
        if(exists){
             navigate(`/course-progress/${id}`)
        }
    }, [id, studentBoughtCoursesData])

    //SKELETON
    if (!courseData) {
        return (
            <div className="w-full flex px-10 gap-4 mt-10">
                {/* LEFT skeleton */}
                <div className="flex flex-col w-3/4 gap-5">
                    <div className="rounded-xl shadow p-6 bg-white">
                        <Skeleton className="h-8 w-1/2 mb-2" />
                        <Skeleton className="h-4 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/4" />
                    </div>
                    <div className="rounded-xl shadow p-6 bg-white">
                        <Skeleton className="h-6 w-1/3 mb-2" />
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                    <div className="rounded-xl shadow p-6 bg-white h-56">
                        <Skeleton className="h-full w-full" />
                    </div>
                </div>

                {/* RIGHT skeleton */}
                <div className="w-1/4">
                    <div className="rounded-xl shadow p-6 bg-white flex flex-col gap-4">
                        <Skeleton className="h-56 w-full" />
                        <Skeleton className="h-8 w-1/2" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>
            </div>
        );
    }
    if (approvalUrl !== "") {
        window.location.href = approvalUrl;
    }
    return (
        <>
            <div className="w-full px-10" >
                <div className="w-full bg-slate-900 text-white rounded-xl shadow-lg p-6 mt-10">
                    <h1 className="text-2xl font-bold mb-2">{courseData.title}</h1>
                    <p className="text-slate-300 mb-4">{courseData.welcomeMessage}</p>
                    <div className="text-sm text-slate-400 flex flex-wrap gap-x-4 gap-y-2 items-center">
                        <span>
                            Created by <span className="font-medium">{courseData.instructor?.userName}</span>
                        </span>
                        <span>| Created on {dateOnly}</span>
                        <span className="flex items-center gap-x-1">
                            <Globe size={14} /> {courseData.primaryLanguage}
                        </span>
                        <span>| {courseData.studentsEnrolled ?? 0} Student
                            {courseData.studentsEnrolled === 1 ? "" : "s"}
                        </span>
                    </div>
                </div>
            </div>
            <div className="w-full flex">
                <div className="flex flex-col">
                    <div className="w-full px-10 pt-5">
                        <Card>
                            <CardContent>
                                <h3 className="font-semibold">what you'll Learn</h3>
                                <ul className="flex flex-wrap">
                                    {items.map((item, idx) => (
                                        <li
                                            key={idx}
                                            className="w-full sm:w-1/2 mb-2 flex items-start gap-2"
                                        >
                                            <CircleCheck className="text-green-600 mt-1 shrink-0" size={18} />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="w-full px-10 pt-5">

                        <Card>
                            <CardContent>
                                <h3 className="font-semibold">Course Description</h3>
                                <p>{items[0]}</p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="w-full px-10 pt-5">

                        <Card>
                            <CardContent>
                                <h3 className="font-semibold">Course Curriculum</h3>
                                <ul className="flex flex-col gap-y-3 ">
                                    {
                                        courseData?.lectures.map(lecture_data => (
                                            <li key={lecture_data._id} className={`flex items-center gap-x-2 ${lecture_data.freePreview ? "hover:cursor-pointer" : ""}`} onClick={() => handleClick(lecture_data)}>
                                                {lecture_data.freePreview ? <CirclePlay className="w-4 h-4 hover:cursor-pointer" /> : <Lock className="w-4 h-4" />}
                                                {lecture_data.title}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                </div>
                <div className="w-2xl pt-5 pr-10">
                    <Card className="w-full">
                        <CardHeader>
                            <img src={courseData.image} className="w-full" />
                        </CardHeader>
                        <CardContent>
                            <h3 className="font-bold text-2xl">${courseData.pricing}</h3>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleCreatePayment} className={"w-full"}>Buy Now</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>

            {
                isDialogOpen ? <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className={"px-7"}>
                        <DialogHeader>
                            <DialogTitle className={"mb-5"}>Course Preview</DialogTitle>
                            <DialogDescription className="border border-slate-200 rounded-xl inset-shadow-sm overflow-hidden  p-2">
                                <VideoPlayer url={dialogUrl} />
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog> : null

            }
        </>
    );
};

export default CourseDetails;
