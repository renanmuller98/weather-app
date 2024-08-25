export const Weather = () => {
    return (
        <section>

            <h1>Weather Forecast</h1>
            <div className="searchBar">
                <input type="search" placeholder="Digite a cidade" />
                <button type="submit">icone</button>
            </div>

            <div>
                <h2>Gravataí</h2>
                <p>Sábado, 25 de Agosto, 15h</p>

                <div>
                    <img src="" alt="Ensolarado" />
                    <h2>14°C</h2>
                </div>

                <div>

                    <h3>descrição</h3>
                    <div>
                        <img src="" alt="" />
                        <img src="" alt="" />
                    </div>

                </div>

                <div>
                    <p>Temperatura Máxima: 14°C</p>
                    <p>Temperatura Mínima: 7°C</p>
                    <p>Vento: 10km/h</p>
                    <p>Umidade: 15%</p>
                </div>

            </div>

        </section>
    )
}