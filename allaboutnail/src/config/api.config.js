const API_BASE_URL = 'https://localhost:7180';

export const API_ENDPOINTS = {
    BASE_URL: API_BASE_URL,
    AUTH: `${API_BASE_URL}/api/Auth`,
    REGISTER: '/api/Auth/register',
    LOGIN: '/api/Auth/login',
    LOGOUT: '/api/Auth/logout',
    CURRENT_USER: '/api/Auth/current-user',
    USERS: '/api/Auth/users',
    ASSIGN_ROLE: '/api/Auth/assign-role',
    GET_EMPLOYEES: '/api/Employees',
    CREATE_EMPLOYEE: '/api/Employees',
    UPDATE_EMPLOYEE: (id) => `/api/Employees/${id}`,
    DELETE_EMPLOYEE: (id) => `/api/Employees/${id}`,
    GET_EMPLOYEE_SCHEDULE: (id) => `/api/Employees/${id}/schedule`,
    GET_AVAILABILITY: '/api/Employees/availability',
    SERVICES: '/api/Services',
    GET_SERVICES: '/api/Services',
    APPOINTMENTS: '/api/Appointments',
    GET_RESERVATIONS: '/api/Appointments',
    CREATE_RESERVATION: '/api/Appointments',
    UPDATE_RESERVATION: (id) => `/api/Appointments/${id}`,
    DELETE_RESERVATION: (id) => `/api/Appointments/${id}`
};

export default API_ENDPOINTS;
