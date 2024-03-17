const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();


async function createDepartment(req, res) {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }

    try {
        const department = await prisma.department.findUnique({
            where: {
                name: name
            }
        });

        if (department) {
            return res.status(400).json({ message: "Department already exists" });
        }

        const newDepartment = await prisma.department.create({
            data: {
                name: name
            }
        });

        return res.status(201).json({
            message: "Department created successfully",
            department: {
                id: newDepartment.id,
                name: newDepartment.name
            }
        });

    } catch (error) {
        return res.status(400).json({ message: "An error occurred" });
    }
};

async function updateDepartment(req, res) {
    const { id, name } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Id is required" });
    }

    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }

    try {
        const department = await prisma.department.findUnique({
            where: {
                id: id
            }
        });

        if (!department) {
            return res.status(400).json({ message: "Department does not exist" });
        }

        const updatedDepartment = await prisma.department.update({
            where: {
                id: id
            },
            data: {
                name: name
            }
        });

        return res.status(200).json({
            message: "Department updated successfully",
            department: {
                id: updatedDepartment.id,
                name: updatedDepartment.name
            }
        });

    } catch (error) {
        return res.status(400).json({ message: "An error occurred" });
    }
};

async function deleteDepartment(req, res) {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Id is required" });
    }

    try {
        const department = await prisma.department.findUnique({
            where: {
                id: id
            }
        });

        if (!department) {
            return res.status(400).json({ message: "Department does not exist" });
        }

        await prisma.department.delete({
            where: {
                id: id
            }
        });

        return res.status(200).json({
            message: "Department deleted successfully"
        });

    } catch (error) {
        return res.status(400).json({ message: "An error occurred" });
    }
};

async function getDepartment(req, res) {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Id is required" });
    }

    try {
        const department = await prisma.department.findUnique({
            where: {
                id: id
            }
        });

        if (!department) {
            return res.status(400).json({ message: "Department does not exist" });
        }

        return res.status(200).json({
            department: {
                id: department.id,
                name: department.name
            }
        });

    } catch (error) {
        return res.status(400).json({ message: "An error occurred" });
    }
};

async function getDepartments(req, res) {
    try {
        const departments = await prisma.department.findMany();

        return res.status(200).json({
            departments: departments
        });

    } catch (error) {
        return res.status(400).json({ message: "An error occurred" });
    }
};


async function createRole(req, res) {
    const { title, salary, departmentId } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    if (!salary) {
        return res.status(400).json({ message: "Salary is required" });
    }

    if (!departmentId) {
        return res.status(400).json({ message: "DepartmentId is required" });
    }

    try {
        const role = await prisma.role.findUnique({
            where: {
                title: title
            }
        });

        if (role) {
            return res.status(400).json({ message: "Role already exists" });
        }

        const newRole = await prisma.role.create({
            data: {
                title: title,
                salary: salary,
                departmentId: departmentId
            }
        });

        return res.status(201).json({
            message: "Role created successfully",
            role: {
                id: newRole.id,
                title: newRole.title,
                salary: newRole.salary,
                departmentId: newRole.departmentId
            }
        });

    } catch (error) {
        return res.status(400).json({ message: "An error occurred" });
    }
};

async function updateRole(req, res) {
    const { id, title, salary, departmentId } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Id is required" });
    }

    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    if (!salary) {
        return res.status(400).json({ message: "Salary is required" });
    }

    if (!departmentId) {
        return res.status(400).json({ message: "DepartmentId is required" });
    }

    try {
        const role = await prisma.role.findUnique({
            where: {
                id: id
            }
        });

        if (!role) {
            return res.status(400).json({ message: "Role does not exist" });
        }

        const updatedRole = await prisma.role.update({
            where: {
                id: id
            },
            data: {
                title: title,
                salary: salary,
                departmentId: departmentId
            }
        });

        return res.status(200).json({
            message: "Role updated successfully",
            role: {
                id: updatedRole.id,
                title: updatedRole.title,
                salary: updatedRole.salary,
                departmentId: updatedRole.departmentId
            }
        });

    } catch (error) {
        return res.status(400).json({ message: "An error occurred" });
    }
};

async function deleteRole(req, res) {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Id is required" });
    }

    try {
        const role = await prisma.role.findUnique({
            where: {
                id: id
            }
        });

        if (!role) {
            return res.status(400).json({ message: "Role does not exist" });
        }

        await prisma.role.delete({
            where: {
                id: id
            }
        });

        return res.status(200).json({
            message: "Role deleted successfully"
        });

    } catch (error) {
        return res.status(400).json({ message: "An error occurred" });
    }
};

async function getRole(req, res) {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Id is required" });
    }

    try {
        const role = await prisma.role.findUnique({
            where: {
                id: id
            }
        });

        if (!role) {
            return res.status(400).json({ message: "Role does not exist" });
        }

        return res.status(200).json({
            role: {
                id: role.id,
                title: role.title,
                salary: role.salary,
                departmentId: role.departmentId
            }
        });

    } catch (error) {
        return res.status(400).json({ message: "An error occurred" });
    }
};

async function getRoles(req, res) {
    try {
        const roles = await prisma.role.findMany();

        return res.status(200).json({
            roles: roles
        });

    } catch (error) {
        return res.status(400).json({ message: "An error occurred" });
    }
};


async function createEmployee(req, res) {
    const { firstName, lastName, roleId } = req.body;

    if (!firstName) {
        return res.status(400).json({ message: "FirstName is required" });
    }

    if (!lastName) {
        return res.status(400).json({ message: "LastName is required" });
    }

    if (!roleId) {
        return res.status(400).json({ message: "RoleId is required" });
    }

    try {
        const employee = await prisma.employee.findUnique({
            where: {
                firstName: firstName,
                lastName: lastName
            }
        });

        if (employee) {
            return res.status(400).json({ message: "Employee already exists" });
        }

        const newEmployee = await prisma.employee.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                roleId: roleId,
            }
        });

        return res.status(201).json({
            message: "Employee created successfully",
            employee: {
                id: newEmployee.id,
                firstName: newEmployee.firstName,
                lastName: newEmployee.lastName,
                roleId: newEmployee.roleId,
            }
        });

    } catch (error) {
        return res.status(400).json({ message: "An error occurred" });
    }
};

async function updateEmployee(req, res) {
    const { id, firstName, lastName, roleId } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Id is required" });
    }

    if (!firstName) {
        return res.status(400).json({ message: "FirstName is required" });
    }

    if (!lastName) {
        return res.status(400).json({ message: "LastName is required" });
    }

    if (!roleId) {
        return res.status(400).json({ message: "RoleId is required" });
    }

    try {
        const employee = await prisma.employee.findUnique({
            where: {
                id: id
            }
        });

        if (!employee) {
            return res.status(400).json({ message: "Employee does not exist" });
        }

        const updatedEmployee = await prisma.employee.update({
            where: {
                id: id
            },
            data: {
                firstName: firstName,
                lastName: lastName,
                roleId: roleId,
            }
        });

        return res.status(200).json({
            message: "Employee updated successfully",
            employee: {
                id: updatedEmployee.id,
                firstName: updatedEmployee.firstName,
                lastName: updatedEmployee.lastName,
                roleId: updatedEmployee.roleId,
            }
        });

    } catch (error) {
        return res.status(400).json({ message: "An error occurred" });
    }
};

async function deleteEmployee(req, res) {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Id is required" });
    }

    try {
        const employee = await prisma.employee.findUnique({
            where: {
                id: id
            }
        });

        if (!employee) {
            return res.status(400).json({ message: "Employee does not exist" });
        }

        await prisma.employee.delete({
            where: {
                id: id
            }
        });

        return res.status(200).json({
            message: "Employee deleted successfully"
        });

    } catch (error) {
        return res.status(400).json({ message: "An error occurred" });
    }
};

async function getEmployee(req, res) {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Id is required" });
    }

    try {
        const employee = await prisma.employee.findUnique({
            where: {
                id: id
            }
        });

        if (!employee) {
            return res.status(400).json({ message: "Employee does not exist" });
        }

        return res.status(200).json({
            employee: {
                id: employee.id,
                firstName: employee.firstName,
                lastName: employee.lastName,
                roleId: employee.roleId,
            }
        });

    } catch (error) {
        return res.status(400).json({ message: "An error occurred" });
    }
};

async function getEmployees(req, res) {
    try {
        const employees = await prisma.employee.findMany();

        return res.status(200).json({
            employees: employees
        });

    } catch (error) {
        return res.status(400).json({ message: "An error occurred" });
    }
};


module.exports = {
    createDepartment,
    updateDepartment,
    deleteDepartment,
    getDepartment,
    getDepartments,
    createRole,
    updateRole,
    deleteRole,
    getRole,
    getRoles,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee,
    getEmployees
}
