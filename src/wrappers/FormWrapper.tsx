export default function FormWrapper({ children }: { children: any }) {
    return (
      <div className="bg-white p-4 rounded-lg shadow w-full md:w-96 mb-6">
        {children}
      </div>
    );
}