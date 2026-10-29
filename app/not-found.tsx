export default function NotFound() {
  return (
    <main style={{minHeight: '70vh', display: 'grid', placeContent: 'center', textAlign: 'center', gap: 16, padding: 24, fontFamily: 'inherit'}}>
      <p style={{fontSize: 13, letterSpacing: 2, color: '#7a8270'}}>404</p>
      <h1 style={{fontSize: 32, margin: 0}}>Страница не найдена</h1>
      <p style={{color: '#6b7362', margin: 0}}>Sahifa topilmadi</p>
      <p style={{marginTop: 12}}>
        <a href="/ru" style={{borderBottom: '1px solid #bac2ae', paddingBottom: 4}}>На главную</a>
        {'  ·  '}
        <a href="/ru/catalog" style={{borderBottom: '1px solid #bac2ae', paddingBottom: 4}}>Каталог</a>
      </p>
    </main>
  );
}
