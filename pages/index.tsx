
import { useRef, FormEvent, useState, useEffect } from "react";
import Head from 'next/head'
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scrollarea";
import { LineWobble } from "@uiball/loaders";
import { JellyTriangle } from "@uiball/loaders";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectSeparator,
  SelectGroup,
  SelectLabel,
  SelectValue,
} from "../components/ui/select";
import { Separator } from "../components/ui/separator";

export default function Home() {
  const [generatedStory, setGeneratedStory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>();
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [feeling, setFeeling] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [tone, setTone] = useState<string>("");
  const [text, setText] = useState<string>("")

  useEffect(() => {
    setText(`Write me a story in a tone that is ${tone}. Make it about a ${gender} named ${name}. The story should be about feeling more ${feeling}. Use appropriate language for a ${age} year old.`)
  }, [tone,gender,name,age,feeling])

  const handleSubmit = async (e: any) => {
    console.log(e);
    const prompt = text;
    e.preventDefault();
    setGeneratedStory("");
    setLoading(true);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        gender: gender,
        feeling: feeling,
        age: age,
        tone: tone,
      }),
    });

    const result = response.body;

    if (!result) {
      return;
    }

    const reader = result.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedStory((prev) => prev + chunkValue);
    }
    setLoading(false)
  };

  const handleClear = (e: any) => {
    setName("");
    setGender("");
    setAge("");
    setFeeling("");
    setTone("");
    setGeneratedStory("");
  };

  return (
    <>
      <Head>
        <title>Write Them a Story</title>
        <meta property="og:title" content="Write Them a Story" key="title" />
        <meta property="og:description" content="Use NextJS and OpenAI to generate a story that inspires and motivates" key="title" />
        <meta property="og:image" content="https://user-images.githubusercontent.com/17350652/225241929-1bbdfae1-7479-4e97-95f9-75382e876093.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content='@codydearkland' />
        <meta name="twitter:title" content="Write Them a Story" />
        <meta name="twitter:description" content="Write a kids story with OpenAI" />
        <meta name="twitter:image" content="https://user-images.githubusercontent.com/17350652/225241929-1bbdfae1-7479-4e97-95f9-75382e876093.png" />
      </Head>
      <main className="bg-cover min-h-screen bg-no-repeat bg-white">
        <div className=" sm:w-3/5 mx-auto pb-4 px-4 font-bold font-sohne text-black">
          <div className="grid pb-4 mx-auto place-items-center place-content-center">
            <h1 className="text-4xl text-ldblack pt-4 xl:text-6xl 2xl:text-9xl">
              Write them a story...
            </h1>
            <h1 className="mx-auto pt-2 text-2xl sm:text-4xl">
              With <span className="text-ldred">OpenAI</span> and{" "}
              <span className="text-ldred">NextJS</span>
            </h1>
            <p className="pt-4 text-sm sm:text-lg">Use OpenAI and NextJS to generate short stories for your kids.</p>
            
            <p className="place-content-center mx-auto pt-4 pb-2">Generated Prompt:</p> 
            <pre className="text-ldred">{text}</pre>
          </div>
          <Separator />

          <form className="py-3" onSubmit={handleSubmit} method="post">
            <div className="grid md:grid-cols-2 w-full xl:w-2/3 pb-2 mx-auto place-items-center space-y-2">
              <Input className="w-5/6" type="prompt" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name..." />
              <Input className="w-5/6" type="prompt" id="age" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age..." />
              </div>
              <div className="grid md:grid-cols-3 mx-auto place-items-center space-y-2">
              <Select onValueChange={(e) => setGender(e)} >
                <SelectTrigger className="w-5/6">
                  <SelectValue placeholder="Gender..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="boy">Boy</SelectItem>
                  <SelectItem value="girl">Girl</SelectItem>
                  <SelectItem value="gender non-binary">Non-Binary</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(e) => setTone(e)}>
                <SelectTrigger className="w-5/6">
                  <SelectValue placeholder="Story Tone..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="adventurous">Adventurous</SelectItem>
                  <SelectItem value="happy">Happy</SelectItem>
                  <SelectItem value="sleepy">Sleepy</SelectItem>
                  <SelectItem value="bored">Bored</SelectItem>
                  <SelectItem value="curious">Curious</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(e) => setFeeling(e)}>
                <SelectTrigger className="w-5/6">
                  <SelectValue placeholder="About Feeling..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="confident">Confident</SelectItem>
                  <SelectItem value="brave">Brave</SelectItem>
                  <SelectItem value="strong">Strong</SelectItem>
                  <SelectItem value="smart">Smart</SelectItem>
                  <SelectItem value="kind">Kind</SelectItem>
                </SelectContent>
              </Select>
            
            </div>
            <div className="grid grid-flow-col space-x-4">
              {!loading && (
                <button
                  className="bg-black rounded-xl text-white font-medium h-10 max-h-10 px-4 py-2 sm:mt-6 mt-4 hover:bg-black/80"
                  onClick={(e) => handleSubmit(e)}
                >
                  Submit
                </button>
              )}
              {loading && (
                <button className="flex bg-black place-content-center place-items-center rounded-xl text-white font-medium h-10 max-h-10 px-4 py-2 sm:mt-6 mt-4 hover:bg-black/80 disabled">
                  <JellyTriangle size={15} speed={1.8} color="white" />
                </button>
              )}
              {generatedStory && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="bg-ldred rounded-xl text-white font-medium px-4 py-2 sm:mt-6 mt-4 hover:bg-ldred/80"
                >
                  Reset Story
                </button>
              )}
            </div>
          </form>
          <Separator />
        </div>
        {generatedStory && (
          <div className="grid w-4/5 md:w-2/3 mx-auto pb-4 text-black whitespace-pre-line	break-normal">       
              <ScrollArea className="rounded-md border p-4">
                <pre>{generatedStory}</pre>
              </ScrollArea>
          </div>
        )}
      </main>
    </>
  );
}
