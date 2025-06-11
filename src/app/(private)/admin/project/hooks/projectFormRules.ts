import { AddProjectModel, Project } from "../model/project";

export function isAddProjectButtonDisabled(form: AddProjectModel) {
  const isNameEmpty = !form.name || form.name.trim() === "";
  const isPrefixEmpty = !form.prefix || form.prefix.trim() === "";

  return isNameEmpty || isPrefixEmpty;
}

export function isProjectNameValid(name: string, projects: Project[]) {
  if (name || name.length > 0) {
    return !projects.some((project) => project.name === name);
  }

  return true;
}

export function isProjectPrefixValid(prefix: string, projects: Project[]) {
  if (prefix.length > 0) {
    return !projects.some((project) => project.prefix === prefix);
  }
  return true;
}
