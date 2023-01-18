export default function ErrorPage({ message }) {
  console.log(message);
  return <div className="text-red-900 text-center">{message}</div>;
}
