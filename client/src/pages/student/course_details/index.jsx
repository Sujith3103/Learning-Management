import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { getCourseById } from "@/services";
import { CircleCheck, CirclePlay, Globe, Lock } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CourseDetails = () => {
    const [courseData, setCourseData] = useState(null);

    const course_title = courseData?.title ? courseData.title.split(" ") : ["", ""];

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
                const response = await getCourseById(id);
                setCourseData(response.data.data);
            } catch (error) {
                console.error("Error fetching course", error);
            }
        }
        fetchData();
    }, [id]);

    if (!courseData) return <div>Loading...</div>;

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
                                <ul className="flex flex-col gap-y-3">
                                    {
                                        courseData?.lectures.map(lecture_data => (
                                            <li key={lecture_data._id} className="flex items-center gap-x-2">
                                                {lecture_data.freePreview ? <CirclePlay className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
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
                            <Button className={"w-full"}>Buy Now</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default CourseDetails;
