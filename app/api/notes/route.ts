import { NextResponse } from 'next/server';

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const DATABASE_ID = "334b095bfae280e3802aca2adf68550a";

export async function GET() {
  if (!NOTION_API_KEY) {
    return NextResponse.json({ error: "NOTION_API_KEY is not set" }, { status: 500 });
  }

  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page_size: 10,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Notion API error');
    }

    const notes = data.results.map((page: any) => {
      // 优先读取 Name 属性
      const titleProperty = page.properties?.Name || page.properties?.Title || page.properties?.["笔记标题"];
      const title = titleProperty?.title?.[0]?.plain_text || 
                   titleProperty?.rich_text?.[0]?.plain_text || 
                   "未命名笔记";

      return {
        id: page.id,
        title: title,
        created_time: page.created_time,
      };
    });

    return NextResponse.json({ notes });

  } catch (error: any) {
    console.error("Notion API Error:", error);
    return NextResponse.json(
      { error: error.message || "无法从 Notion 获取数据" },
      { status: 500 }
    );
  }
}