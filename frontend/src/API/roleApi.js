import { $authHost, $host } from './index';
export const getRoles = async () => {
    const getedRoles = await $authHost.get('api/role')
    return getedRoles.data;
};
