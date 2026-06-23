export default function Alert({ msg, type }) {
  if (!msg) return null;
  return <div className={`alert alert-${type}`}>{msg}</div>;
}
