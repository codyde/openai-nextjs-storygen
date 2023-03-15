
import { useRef, FormEvent, useState } from "react";
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
  const [answer, setAnswer] = useState("");
  const [generatedStory, setGeneratedStory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>();
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [feeling, setFeeling] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [tone, setTone] = useState<string>("");

  const handleSubmit = async (e: any) => {
    console.log(e);
    const prompt = `write me a ${tone} story about a ${gender} named ${name} who is ${age} years old and becoming more ${feeling}. Keep it safe for children.`;
    e.preventDefault();
    setGeneratedStory("");
    // setLoading(true);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prompt),
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
  };

  const handleClear = (e: any) => {
    setName("");
    setGender("");
    setAge("");
    setFeeling("");
    setTone("");
    setAnswer("");
    setGeneratedStory("");
  };

  return (
    <>
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
          </div>
          <Separator />

          <form className="py-3" onSubmit={handleSubmit} method="post">
            {/* <Input type="prompt" id="prompt" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Prompt" /> */}
            <div className="grid md:grid-cols-2 w-2/3 pb-2 mx-auto place-items-center">
            <Input className="w-5/6" type="prompt" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
              <Input className="w-5/6" type="prompt" id="age" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" />
              </div>
              <div className="grid md:grid-cols-3 mx-auto place-items-center">
              <Select onValueChange={(e) => setAnswer(e)} >
                <SelectTrigger className="w-5/6">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="boy">Boy</SelectItem>
                  <SelectItem value="girl">Girl</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(e) => setTone(e)}>
                <SelectTrigger className="w-5/6">
                  <SelectValue placeholder="Tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="happy">Happy</SelectItem>
                  <SelectItem value="funny">Funny</SelectItem>
                  <SelectItem value="sad">Sad</SelectItem>
                  <SelectItem value="mad">Mad</SelectItem>
                  <SelectItem value="ridiculous">Ridiculous</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(e) => setFeeling(e)}>
                <SelectTrigger className="w-5/6">
                  <SelectValue placeholder="Feeling" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="confident">Confident</SelectItem>
                  <SelectItem value="brave">Brave</SelectItem>
                  <SelectItem value="strong">Strong</SelectItem>
                  <SelectItem value="shy">Shy</SelectItem>
                  <SelectItem value="scared">Scared</SelectItem>
                </SelectContent>
              </Select>
            
              
              {/* <Input className="px-2 py-2" type="prompt" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Gender" />
              <Input className="px-2 py-2 " type="prompt" id="feeling" value={feeling} onChange={(e) => setFeeling(e.target.value)} placeholder="Feeling" />
              <Input className="px-2 py-2 " type="prompt" id="tone" value={tone} onChange={(e) => setTone(e.target.value)} placeholder="Tone" /> */}
            </div>
            <div className="grid grid-flow-col">
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
          <div className="grid w-4/5 md:w-2/3 mx-auto pb-4 h-3/5 text-black whitespace-pre-line	break-normal">
            {!loading && (
              <ScrollArea className="rounded-md border p-4">
                <pre>{generatedStory}</pre>
              </ScrollArea>
            )}
            {loading && (
              <div className="flex place-items-center place-content-center">
                <LineWobble
                  size={100}
                  speed={1.8}
                  lineWeight={10}
                  color="pink"
                />
              </div>
            )}
          </div>
        )}
      </main>
    </>
  );
}
