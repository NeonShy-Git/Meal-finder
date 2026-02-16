interface Properties{
    searchWord: string;
    setSearchWord:  (value: string) => void;
}

function SearchBarWithIcon ({searchWord, setSearchWord}: Properties){
    return (
        <div className="search">
            <input type="text" placeholder="Buscar algo" className="search-bar" value={searchWord} onChange={(e) => setSearchWord(e.target.value)} />
        </div>
    )
}

export default SearchBarWithIcon;