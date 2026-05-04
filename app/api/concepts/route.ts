import { NextResponse } from 'next/server';

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const DATABASE_ID = "334b095bfae2802c83aacbc55cf78edc";

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
      body: JSON.stringify({ page_size: 10 }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Notion API error');
    }

    const concepts = data.results.map((page: any) => {
      let title = "未命名概念";

      // 尝试多种可能的标题属性（加强版）
      const props = page.properties || {};
      
      // 优先尝试常见的标题属性
      if (props.Name?.title?.[0]?.plain_text) title = props.Name.title[0].plain_text;
      else if (props.Title?.title?.[0]?.plain_text) title = props.Title.title[0].plain_text;
      else if (props["标题"]?.title?.[0]?.plain_text) title = props["标题"].title[0].plain_text;
      else if (props["概念名称"]?.title?.[0]?.plain_text) title = props["概念名称"].title[0].plain_text;
      else if (props["Name"]?.rich_text?.[0]?.plain_text) title = props["Name"].rich_text[0].plain_text;
      else if (props["名称"]?.title?.[0]?.plain_text) title = props["名称"].title[0].plain_text;

      return {
        id: page.id,
        title: title,
        created_time: page.created_time,
      };
    });

    return NextResponse.json({ concepts });

  } catch (error: any) {
    console.error("Notion API Error:", error);
    return NextResponse.json({ error: error.message || "无法从 Notion 获取数据" }, { status: 500 });
  }
}