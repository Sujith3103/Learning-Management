import { Button } from "../ui/button";
import FormControls from "./form_controls";

export default function CommonForm({handleSubmit, buttonText, formControls = [], formData, setFormData }) {
  return (
    <form onSubmit={handleSubmit}>
        {/* {render Form Controls Here} */}
        <FormControls formControls={formControls} formData={formData} setFormData={setFormData} />
        <Button type="submit" className="w-full mt-5">{buttonText || "Submit"}</Button>
    </form>
  );
}