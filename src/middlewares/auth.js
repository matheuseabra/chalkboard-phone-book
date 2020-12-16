import jwt from 'jsonwebtoken';

export default (ctx) => {
  const { Authorization } = ctx.event.headers;
  if (!Authorization) throw new Error('Not authorized');
  const token = Authorization.replace('Bearer ', '');
  const { userId } = jwt.verify(token, 'SECRET');
  return userId;
}