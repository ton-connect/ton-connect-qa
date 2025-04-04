import fs from 'fs-extra'
import path from 'node:path'
import { downloadFile, ensureCacheDirExists, unzipArchive } from '@synthetixio/synpress-cache'

export const VERSION = '3.27.4'
export const PLATFORM = 'chrome'
export const REPO = 'tonkeeper/tonkeeper-web'
export const DOWNLOAD_URL = `https://github.com/${REPO}/releases/download/v${VERSION}/tonkeeper_${PLATFORM}_v${VERSION}.zip`

export async function tonkeeperExtension(forceCache = true) {
  let outputDir = ''
  if (forceCache) {
    outputDir = ensureCacheDirExists()
  } else {
    outputDir = path.resolve('./', 'downloads')
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir)
    }
  }

  const downloadResult = await downloadFile({
    url: DOWNLOAD_URL,
    outputDir,
    fileName: `tonkeeper-${PLATFORM}-${VERSION}.zip`,
  })

  const unzipResult = await unzipArchive({
    archivePath: downloadResult.filePath,
  })

  return unzipResult.outputPath
}
