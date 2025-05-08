

import { Input } from "../ui/input";
import { Label } from"../ui/label";
import { Select, SelectTrigger, SelectValue, SelectItem, } from"../ui/select";


export default function FormControls({ formControls = [], formData, setFormData }) {

    let element = null;

    function renderComponentByType(getControlItem) {

        if (getControlItem.componentType === "input") {
            element = <Input
                id={getControlItem.name}
                type={getControlItem.type}
                name={getControlItem.name}
                placeholder={getControlItem.placeholder}
            // value={formData[getControlItem.name]}
            // onChange={(e) => setFormData({...formData, [getControlItem.name]: e.target.value})}
            />
            return element
        }


        else if (getControlItem.componentType === "select") {
            element =
                <Select>
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
            // value={formData[getControlItem.name]}
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