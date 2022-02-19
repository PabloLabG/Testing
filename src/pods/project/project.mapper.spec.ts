import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';
import { mapProjectFromApiToVm } from './project.mapper';
import * as projectVM from '../../pods/project/project.vm';

describe('./pods/project/project.mapper', () => {
  it('Deberia ser object de "Project" vacío cuando es "undefined" en la entrada', () => {
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

  it('Deberia ser object de "Project" vacío cuando es "null" en la entrada', () => {
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

  it('Debe ser un array empty al pasar un "Project" sin employees', () => {
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

  it('Al llamar al mapProjectFromApiToVm con datos devuelve un object con el mismo tipo y valores', () => {
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
