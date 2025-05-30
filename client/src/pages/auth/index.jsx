    import CommonForm from "@/components/common_form";
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
    import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
    import { signInFormControls, signUpFormControls } from "@/config";
    import { AuthContext } from "@/context/auth_context";
    import { GraduationCap } from "lucide-react";
    import { useContext, useEffect, useState } from "react";
    import { Link } from "react-router-dom";

    export default function AuthPage() {

        const { signInFormData, signUpFormData, setSignInFormData, setSignUpFormData,handleRegisterUser } = useContext(AuthContext)
        const [activeTab, setActiveTab] = useState("signin")

        console.log(signInFormData)

        const handleValueChange = () => {
            setActiveTab(activeTab === "signin" ? "signup" : "signin")
        }

        // const handleButtonDisabled = () => {
        //     if (activeTab === "signin") {
        //       return !signInFormData.userEmail || !signInFormData.UserPassword;
        //     } else {
        //       return !signUpFormData.UserEmail || !signUpFormData.UserPassword || !signUpFormData.userName;
        //     }
        //   };

        //   useEffect(() => {
        //     handleButtonDisabled()
        //   }, [signInFormData, signUpFormData]);

        return (
            <div className="flex flex-col min-h-screen">
                <header className="px-4 lg:px-6 h-14 mt-2 flex items-center border-y-2">
                    <Link to='/' className="flex items-center justify-center">
                        <GraduationCap className="h-8 w-8 mr-4" />
                        <span className="font-extrabold text-xl">LMS LEARN</span>
                    </Link>
                </header>

                <div className="flex items-center justify-center min-h-screen bg-background">
                    <Tabs defaultValue="signin" className="w-[400px]" onValueChange={() => handleValueChange()}>
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="signin" className="cursor-pointer" >SignIn</TabsTrigger>

                            <TabsTrigger value="signup" className="cursor-pointer" >SignUp</TabsTrigger>
                            {console.log(activeTab)}
                        </TabsList>
                        <TabsContent value="signin">
                        <Card className='p-6 space-y-4'>
                            <CardHeader>
                                <CardTitle>Sign in to your account</CardTitle>
                                <CardDescription>
                                    Enter your credentials to access your account.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <CommonForm 
                                    formControls={signInFormControls}
                                    buttonText={"Sign In"}
                                    formData={signInFormData}
                                    setFormData={setSignInFormData}
                                    context={"signin"}
                                    // isButtonDisabled={handleButtonDisabled()}
                                    
                                />
                            </CardContent>
                        </Card>
                        </TabsContent>
                            
                        <TabsContent value="signup">
                        <Card className='p-6 space-y-4'>
                            <CardHeader>
                                <CardTitle>Create a new  account</CardTitle>
                                <CardDescription>
                                    Enter your credentials to create your account.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <CommonForm 
                                    formControls={signUpFormControls}
                                    buttonText={"Sign Up"}
                                    formData={signUpFormData}
                                    setFormData={setSignUpFormData}
                                    // isButtonDisabled={handleButtonDisabled()}
                                    handleSubmit={handleRegisterUser}
                                    context={"signup"}
                                />
                            </CardContent>
                        </Card>
                        </TabsContent>

                    </Tabs>
                </div>

            </div>
        );
    }