import { NEW_PROJECT_CONSTANTS } from "@/shared/form/form.constants";

const en = {
    "app_name": "Carberus",
    "buttons": {
        "cancel": "Cancel",
        "delete": "Delete",
        "submit": "Submit"
    },

    "project": {
        "addProjectLabel": "Add Project",
        "edit": {
            "title" : "Edit Project",
            "updateProjectLabel": "Update Project",
            "nameLimit": () => `Max ${NEW_PROJECT_CONSTANTS.NAME_MAX_LENGTH} characters.`,
            "prefixLimit": () => `Max ${NEW_PROJECT_CONSTANTS.PREFIX_MAX_LENGTH} characters.`,
            "descriptionLimit": () => `Max ${NEW_PROJECT_CONSTANTS.DESCRIPTION_MAX_LENGTH} characters.`, 
            "description": "Description"
        },
        "code": "Project Prefix",
        "name": "Name",
        "description": "Description",
        "created_at": "Created At",
        "updated_at": "Updated At",
        "archive": {
            "title": "Archive Project",
            "confirmation": "Are you sure you want to archive this project?",
            "description": "Archiving a project will remove it from the active list but keep it in the system for future reference. You can restore it later if needed."
        },
        "activate": {
            "title": "Activate Project",
            "confirmation": "Are you sure you want to activate this project?",
            "description": "Activating a project will remove it from the archive list. Users will be able to add test cases and execute them."
        }
    }
}

export default en;