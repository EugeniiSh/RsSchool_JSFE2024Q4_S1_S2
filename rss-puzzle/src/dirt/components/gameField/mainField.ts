import externalStorage from '../storage/external';


export default async function check()
{
  const data = await externalStorage.getData(1);

  console.log(data);
  console.log(externalStorage.getAudioPath(data.rounds[9].words[3]));
  console.log(externalStorage.getImagePath(data.rounds[9].levelData));
}