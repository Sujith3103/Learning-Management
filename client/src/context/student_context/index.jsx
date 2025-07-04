import { createContext, useState } from "react";

export const StudentContext = createContext(null)

export default function StudentProvider({children}){

    const [studentBoughtCoursesData , setstudentBoughtCoursesData] = useState([])

    return <StudentContext.Provider value={{studentBoughtCoursesData,setstudentBoughtCoursesData}}>{children}</StudentContext.Provider>
}