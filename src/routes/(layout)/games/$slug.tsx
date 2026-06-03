import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(layout)/games/$slug')({
  component: RouteComponent
});

function RouteComponent() {
  return <div>Hello "/(layout)/$slug"!</div>;
}
