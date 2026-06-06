import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(layout)/_authenticated/history')({
  component: RouteComponent
});

function RouteComponent() {
  return <div>Hello "/(layout)/_authenticated/history"!</div>;
}
