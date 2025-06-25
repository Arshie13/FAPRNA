import Loading from '@/components/ui/loading'

export default function LoadingPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1">
                <Loading />
            </main>
        </div>
    );
}