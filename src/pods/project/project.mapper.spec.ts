import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';
import { mapProjectFromApiToVm } from './project.mapper';
import * as projectVM from '../../pods/project/project.vm';

describe('./pods/project/project.mapper', () => {
  it('Must be "Project" object empty when is "undefined" on load', () => {
    // Arrange
    const projectModel: apiModel.Project = undefined;
    const modelEmpty = viewModel.createEmptyProject();
    const createEmptyProject = jest.spyOn(projectVM, 'createEmptyProject');

    // Act
    const result = mapProjectFromApiToVm(projectModel);

    // Assert
    // toBe, toEqual, toStrickEqual
    expect(createEmptyProject).toHaveBeenCalled();
    expect(result).toStrictEqual(modelEmpty);
  });

  it('Must be "Project" object empty when is "null" on load', () => {
    // Arrange
    const projectModel: apiModel.Project = null;
    const modelEmpty = viewModel.createEmptyProject();
    const createEmptyProject = jest.spyOn(projectVM, 'createEmptyProject');

    // Act
    const result = mapProjectFromApiToVm(projectModel);

    // Assert
    expect(createEmptyProject).toHaveBeenCalled();
    expect(result).toStrictEqual(modelEmpty);
  });

  it('Must be array empty when add "Project" without employees', () => {
    // Arrange
    const project: apiModel.Project = {
      id: '0',
      name: 'Nombre Project',
      isActive: true,
      employees: undefined,
    };
    const employeesArrEmpty: apiModel.Project = { ...project, employees: [] };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toStrictEqual(employeesArrEmpty);
  });

  it('When call to mapProjectFromApiToVm with data ereturn an object with the same values', () => {
    // Arrange
    const project: apiModel.Project = {
      id: '0',
      name: 'Nombre Project',
      isActive: true,
      employees: [
        {
          id: 'employee_001',
          employeeName: 'Nombre1',
        },
        {
          id: 'employee_002',
          employeeName: 'Nombre2',
        },
        {
          id: 'employee_003',
          employeeName: 'Nombre3',
        },
      ],
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toStrictEqual(project);
  });
});
