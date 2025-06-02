import CardComponent from "@/app/resusable/card.component";
import FormInputBox from "@/app/resusable/form.input.component";


export default function AddTestCaseMainView() {
    return (
        <div>
            <h1>I am in add test case view</h1>
            <CardComponent header="User Info">
                <FormInputBox labelText="Import File" />
            </CardComponent>
        </div>
    )
}