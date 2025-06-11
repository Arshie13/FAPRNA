import Board from '@/components/Board'

export default function BoardPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1">
                <Board />
            </main>
        </div>
    )
}