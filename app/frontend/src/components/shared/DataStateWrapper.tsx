import { Skeleton, type SkeletonProps } from "@mantine/core";
import type { ReactNode } from "@tabler/icons-react";
import type { EmptyStateProps } from "./EmptyState";
import EmptyState from "./EmptyState";

interface BaseDataStateWrapperProps {
    isLoading: boolean;
    loadingProps?: SkeletonProps;
    children: ReactNode;
}

type DataStateWrapperProps = BaseDataStateWrapperProps & (
    | { isEmpty?: true; emptyProps: EmptyStateProps }
    | { isEmpty?: false; emptyProps?: never }
    | { isEmpty?: boolean; emptyProps: EmptyStateProps }
)

export default function DataStateWrapper({ isLoading=false, isEmpty=false, loadingProps, emptyProps, children }: DataStateWrapperProps) {
    if (isLoading) {
        return <Skeleton {...loadingProps}>{children}</Skeleton>
    }
    
    if (isEmpty) {
        return <EmptyState {...emptyProps!} />
    }
    
    return children;
}
