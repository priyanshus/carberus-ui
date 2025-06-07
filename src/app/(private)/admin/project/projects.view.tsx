import CardComponent from "@/app/resusable/card-layout/card.component";
import ProjectsViewHeader from "./projects.view.header";


export default function ProjectsView() {
    return (
        <>
            <CardComponent header={<ProjectsViewHeader />}>
                <h1>Projects</h1>
                <p>List of projects will be displayed here.</p>
            </CardComponent>
        </>
    );
}