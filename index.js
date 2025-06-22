/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (props, objs) => {
    return objs.map(obj => {
      const newObj = { ...obj }; 
      props.forEach(prop => {
        delete newObj[prop]; 
      });
      return newObj;
    });
  };
exports.excludeByProperty = (prop, objs) => {
  return objs.filter(obj => !obj.hasOwnProperty(prop));
};
exports.sumDeep = (items) => {
    return items.map(item => {
      const sum = item.objects.reduce((total, obj) => total + obj.val, 0);
      return { objects: sum };
    });
  };
exports.applyStatusColor = (colorMap, statuses) => {
    const statusToColor = Object.entries(colorMap).reduce((acc, [color, codes]) => {
      codes.forEach(code => {
        acc[code] = color;
      });
      return acc;
    }, {});
  
    return statuses
      .filter(item => statusToColor[item.status] !== undefined)
      .map(item => ({
        ...item,
        color: statusToColor[item.status],
      }));
};
exports.createGreeting = (greetFn, greeting) => {
    return (name) => greetFn(greeting, name);
};
exports.setDefaults = (defaultProps) => {
    return (obj) => {
      return { ...defaultProps, ...obj };
    };
};
exports.fetchUserByNameAndUsersCompany = async (name, services) => {
    const users = await services.fetchUsers();
    const user = users.find(u => u.name === name);
  
    const [company, status] = await Promise.all([
      services.fetchCompanyById(user.companyId),
      services.fetchStatus(),
    ]);
  
    return {
      user,
      company,
      status,
    };
  };