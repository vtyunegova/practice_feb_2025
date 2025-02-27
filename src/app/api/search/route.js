export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const page = searchParams.get('page') || 1;
    const perPage = searchParams.get('per_page') || 16;

    const ACCESS_KEY = 'r54ZNqFRT1JkCmE50KsxNey0Z-G_5D2MAZ8Kz-6Sr-o';

    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=${perPage}`, {
            headers: {
                Authorization: `Client-ID ${ACCESS_KEY}`,
            },
        });

        if (!response.ok) {
            return new Response(JSON.stringify({ error: 'Ошибка HTTP' }), { status: response.status });
        }

        const data = await response.json();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.error('Ошибка при обращении к api:', error);
        return new Response(JSON.stringify({ error: 'Внутренняя ошибка сервера' }), { status: 500 });
    }
}