import type {ReactNode} from "react";

export function PageHeader({description, title}: {title: string; description: ReactNode}) {
  return (
    <div className="border-separator border-b">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-10">
        <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
        <p className="text-muted max-w-2xl text-sm leading-6 sm:text-base">{description}</p>
      </div>
    </div>
  );
}
