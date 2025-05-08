

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectTrigger, SelectValue, SelectItem, } from "../ui/select";


export default function FormControls({ formControls = [], formData, setFormData }) {

    let element = null;

    //form data -> {userName: "", email: "", password: ""} Context -> {signInFormData, signUpFormData}

    //formControls -> [{name: "userName", label: "UserName", placeholder: "Enter your username", type: "text", componentType: "input"}, {...}]

    function renderComponentByType(getControlItem) {
        const currentControlItemValue = formData[getControlItem.name] || ""
        if (getControlItem.componentType === "input") {
            element = <Input
                id={getControlItem.name}
                type={getControlItem.type}
                name={getControlItem.name } //when submit,in the url it can be used as a key to get the value
                placeholder={getControlItem.placeholder}
                value={currentControlItemValue}
                onChange={(event) => setFormData({
                    ...formData,
                    [getControlItem.name]: event.target.value
                })}

            />
            return element
        }


        else if (getControlItem.componentType === "select") {
            element =
                <Select
                    onValueChange={(value) => setFormData({
                        ...formData,
                        [getControlItem.name]: value

                    })}
                    value={currentControlItemValue}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={getControlItem.label} />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            getControlItem.options && getControlItem.options.length > 0 ?
                                getControlItem.options.map((optionItem) => (
                                    <SelectItem key={optionItem.id} value={optionItem.id}>
                                        {optionItem.label}
                                    </SelectItem>
                                )) : null
                        }
                    </SelectContent>

                </Select>
            return element
        }

        else if (getControlItem.componentType === "textarea") {
            element = <Input
                id={getControlItem.name}
                name={getControlItem.name}
                placeholder={getControlItem.placeholder}
                type={getControlItem.type}
                value={currentControlItemValue}
            // onChange={(e) => setFormData({...formData, [getControlItem.name]: e.target.value})}
            />
            return element
        }
    }

    return (
        <div className="flex flex-col gap-3">

            {formControls.map((controlItem, index) =>

                <div key={controlItem.name} className="">
                    <Label htmlFor={controlItem.name} className='mb-1'>{controlItem.label}</Label>
                    {
                        renderComponentByType(controlItem)

                    }
                </div>
            )}
        </div>
    )
}