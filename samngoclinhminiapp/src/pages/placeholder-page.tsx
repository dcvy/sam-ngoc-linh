import { Page } from "zmp-ui";

export interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <Page className="flex flex-col items-center justify-center bg-[#F5F5F7] px-6 pb-28 text-center">
      <h1 className="text-[18px] font-extrabold text-gray-900">{title}</h1>
      <p className="mt-2 text-[14px] text-gray-400">
        {description ?? "Tính năng đang được xây dựng."}
      </p>
    </Page>
  );
}