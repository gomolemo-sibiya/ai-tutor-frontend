
import { Skeleton } from "./skeleton";

export const ModuleCardSkeleton = () => (
  <div className="bg-white rounded-lg overflow-hidden border-2 border-[#ebecec] flex flex-col" style={{ minHeight: "380px" }}>
    <Skeleton className="h-56 w-full" />
    <div className="p-4 flex-1 flex flex-col">
      <Skeleton className="h-8 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      <div className="flex-1"></div>
      <div className="flex justify-end">
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    </div>
  </div>
);

export const ModuleContentSkeleton = () => (
  <div className="bg-white rounded-lg p-6 border-2 border-transparent">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Skeleton className="w-5 h-5" />
        <div>
          <Skeleton className="h-6 w-48 mb-2" />
          <div className="flex items-center space-x-3">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>
      <Skeleton className="h-10 w-24 rounded-lg" />
    </div>
  </div>
);

export const ContentSkeleton = () => (
  <div className="space-y-6">
    <div className="mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Skeleton className="w-5 h-5" />
        <Skeleton className="h-5 w-32" />
      </div>
      
      <div className="flex items-center space-x-4 mb-6">
        <Skeleton className="w-16 h-16 rounded-lg" />
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-5 w-24" />
        </div>
      </div>
    </div>

    <div className="space-y-4">
      <Skeleton className="h-6 w-40 mb-4" />
      
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg p-6 border border-[#ebecec]">
          <div className="flex items-start space-x-4">
            <Skeleton className="w-12 h-12 rounded-lg" />
            <div className="flex-1">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-3" />
              <div className="flex items-center space-x-4">
                <Skeleton className="h-6 w-16 rounded" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
