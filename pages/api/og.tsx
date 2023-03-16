import { ImageResponse } from '@vercel/og';
 
export const config = {
  runtime: 'edge',
};
 
export default function () {
  return new ImageResponse(
    (
      <div className='mx-auto text-4xl text-ldblack'>
        Write them a Story with <span className="text-ldred">NextJS</span> and <span className="text-ldred">OpenAI</span>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    },
  );
}