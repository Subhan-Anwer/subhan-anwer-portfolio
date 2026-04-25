import { getCodeStats } from '@/sanity/lib/getCodeStats';
import dynamic from 'next/dynamic';

const CodeStatsSection = dynamic(() => import('./CodeStatsSection'));

const CodeStats = async () => {
  const codeStats = await getCodeStats();
  return (
    <>
      <CodeStatsSection codeStats={codeStats} />
    </>
  )
}

export default CodeStats
