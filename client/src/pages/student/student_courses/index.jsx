import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { StudentContext } from "@/context/student_context";
import { userBoughtCourses } from "@/services";
import { PlayIcon } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StudentCourses = () => {
  const { studentBoughtCoursesData, setstudentBoughtCoursesData } = useContext(StudentContext);

  const navigate = useNavigate()

  const handleClick = (id) => {
     navigate(`/course-progress/${id}`)
  }

  useEffect(() => {
    async function fetchCourses() {
      const response = await userBoughtCourses();
      console.log("response :", response);
      setstudentBoughtCoursesData(response);
    }
    fetchCourses();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold">My Courses</h1>

      <div className="flex flex-wrap gap-4 mt-5 ml-2">
        {studentBoughtCoursesData.courses?.map((course) => (
          <Card
            key={course._id}
            className="w-78 flex flex-col justify-between"
          >
            <CardHeader>
              <img
                src={course.courseImage}
                alt={course.title}
                className="h-40 w-full object-cover rounded cursor-pointer"
                onClick={() => handleClick(course.courseId)}
              />
              <CardTitle className="text-lg mt-2">{course.title}</CardTitle>
              <p className="text-sm text-gray-600">{course.instructorName}</p>
            </CardHeader>

            <CardContent className="flex-grow">
              {/* if you want extra content, place here */}
            </CardContent>

            <CardFooter>
              <Button className="w-full flex items-center justify-center gap-2 cursor-pointer">
                <PlayIcon className="w-4 h-4" />
                Start Watching
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentCourses;
