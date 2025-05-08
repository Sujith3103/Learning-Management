import CommonForm from "@/components/common_form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signUpFormControls } from "@/config";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

export default function AuthPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-4 lg:px-6 h-14 mt-2 flex items-center border-y-2">
                <Link to='/' className="flex items-center justify-center">
                    <GraduationCap className="h-8 w-8 mr-4" />
                    <span className="font-extrabold text-xl">LMS LEARN</span>
                </Link>
            </header>

            <div className="flex items-center justify-center min-h-screen bg-background">
                <Tabs defaultValue="signin" className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="signin" className="cursor-pointer">signin</TabsTrigger>
                        <TabsTrigger value="signup" className="cursor-pointer">signup</TabsTrigger>
                    </TabsList>
                    <TabsContent value="signin">
                        signin
                    </TabsContent>
                        
                    <TabsContent value="signup">
                    <CommonForm 
                        formControls={signUpFormControls}
                        />
                    </TabsContent>

                </Tabs>
            </div>

        </div>
    );
}