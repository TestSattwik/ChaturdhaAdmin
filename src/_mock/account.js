// ----------------------------------------------------------------------

const userRole = localStorage.getItem('employee_role_name');
console.log('daj',userRole)

const account = {
  displayName: userRole,
  email: 'arltechbbsr@gmail.oom',
  photoURL: '/assets/images/avatars/avatar_default.jpg',
};

export default account;
