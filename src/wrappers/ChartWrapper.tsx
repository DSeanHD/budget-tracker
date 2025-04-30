export default function ChartWrapper({ children }: { children: any }) {
    return (
        <div className="flex flex-wrap gap-4 w-full">
            {children}
        </div>
    );
}