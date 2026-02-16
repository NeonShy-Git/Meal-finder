interface Properties{
    searchWord: string;
    setSearchWord:  (value: string) => void;
}

function SearchBarWithIcon ({searchWord, setSearchWord}: Properties){
    return (
        <div className="search">
            <input type="text" placeholder="Buscar algo" className="search-bar" value={searchWord} onChange={(e) => setSearchWord(e.target.value)} />
            <button className="to-remove-rounded">
                <span className="material-symbols-outlined">
                    search
                </span>
            </button>
        </div>
    )
}

export default SearchBarWithIcon;