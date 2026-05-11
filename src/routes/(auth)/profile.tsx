import { createFileRoute } from '@tanstack/react-router';

const RouteComponent = () => <div>Hello "/(auth)/profile"!</div>;

export const Route = createFileRoute('/(auth)/profile')({
  component: RouteComponent
});
