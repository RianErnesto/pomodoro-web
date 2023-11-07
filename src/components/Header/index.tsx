import Suggestion from "../Suggestion"

const Header = () => {
    return (
        <header className="flex justify-center gap-8 w-full p-4">
            <Suggestion restTime={5} workTime={25} />
            <Suggestion restTime={10} workTime={50} />
            <Suggestion restTime={15} workTime={75} />
        </header>
    )
}

export default Header