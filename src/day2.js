// Part 1
export const scanBoxId = boxId =>
  Object.values(
    boxId
      .split('')
      .reduce(
        (acc, letter) =>
          Object.assign(
            acc,
            acc[letter] ? { [letter]: acc[letter] + 1 } : { [letter]: 1 }
          ),
        {}
      )
  ).reduce(
    ([twice, thrice], letterOccurences) => [
      letterOccurences === 2 ? true : twice,
      letterOccurences === 3 ? true : thrice,
    ],
    [false, false]
  );

export const calculateCheckSum = (boxIds, delimiter = '\n') =>
  boxIds
    .split(delimiter)
    .map(boxId => scanBoxId(boxId))
    .reduce(
      ([amountOfTwice, amountOfThrice], [twice, thrice]) => [
        twice ? amountOfTwice + 1 : amountOfTwice,
        thrice ? amountOfThrice + 1 : amountOfThrice,
      ],
      [0, 0]
    )
    .reduce((prev, curr) => prev * curr, 1);

// Part 2
export const matchBoxes = (boxesString, delimiter = '\n') => {
  const listOfBoxes = boxesString.split(delimiter);
  const length = listOfBoxes.length;
  let result = '';
  for (let index = 0; index < length; index++) {
    const currentBox = listOfBoxes[index];
    let mostSimilarBox = '';
    for (let compareIndex = index + 1; compareIndex < length; compareIndex++) {
      let currentSimilarBoxId = '';
      const nextBox = listOfBoxes[compareIndex];
      for (let letterIndex = 0; letterIndex < nextBox.length; letterIndex++) {
        const currentLetter = currentBox[letterIndex];
        if (currentLetter === nextBox[letterIndex]) {
          currentSimilarBoxId += currentLetter;
        }
      }
      if (currentSimilarBoxId.length > mostSimilarBox.length) {
        mostSimilarBox = currentSimilarBoxId;
      }
    }
    if (mostSimilarBox.length > result.length) {
      result = mostSimilarBox;
    }
  }
  return result;
};

export const myInput = `mvgowxqubnhaefjslkjlrptzyi
pvgowlqubnhaefmslkjdrpteyi
ovgowoqubnhaefmslkjnrptzyi
cvgowxqubnrxefmslkjdrptzyo
cvgowxqubnhaefmsokjdrprzyf
cvgowxqubnhjeflslkjgrptzyi
cvgowxqvbnhaefmslkhdrotzyi
hvgowxqmbnharfmslkjdrptzyi
cvgoaxqubqhaefmslkjdrutzyi
cvxowxqdbnhaefmslkjdgptzyi
cvgikxqubnhaefmslkjdrptzyz
cvgnwxqubnhaqfjslkjdrptzyi
cqgowxqubnhaecmslkjgrptzyi
cvpowxqucnhaefmslkjdrptzyz
fvuoexqubnhaefmslkjdrptzyi
svgowxqubnhaefmsvkjdrttzyi
cvgowxqubnhaefmblkjdfpbzyi
cvkoyxqubnhaefsslkjdrptzyi
bvgowxqublhaefmslkjdrptzfi
xvgewxqubnhaefmslkjdrztzyi
cvgowxqubzhaefmslkkrrptzyi
cvgowxqubnhaefmslkudruuzyi
cvgowxqubnhaefmvlkjdrptwyl
cvgoyxqubnhaefmslkjvrotzyi
cvgowxoubnhaewmslkjdrpbzyi
cvgowxgubnhaefmslijdrptzxi
lvgowxqkbnhaefmslkjdrptzqi
xvgowxqubyhaefmflkjdrptzyi
wvnowxgubnhaefmslkjdrptzyi
cvgowxguwnhaefhslkjdrptzyi
cvgowfquxnhaefmdlkjdrptzyi
cvgywxqubnuaefmsldjdrpfzyi
cvkowxqzbrhaefmslkjdrptzyi
cviowxzubnhaefmslkjdrptqyi
cvgowxqubnhaefmsozjdrptzyc
cvglwxuubnhaewmslkjdrptzyi
cvgowxquknhaebmsfkjdrptzyi
vvgowxqubnhaesmslkjdrptzri
cvgowxoubndaefmslkjdrftzyi
cvgowxqubghaefmslkjdeptzyw
cvgowxqubnhaetmhlkjdrpvzyi
cvgowmquunhaefmslkjdrptzyt
cvgooxqpbniaefmslkjdrptzyi
cvgowxqubnhaeumslkjdkptiyi
cvgrwxqsbnhaemmslkjdrptzyi
cvrowxqubnhaefmslkjdrctcyi
dvgcwxqubnhaefmslkjdrptzyq
cugowxqubnhasfmmlkjdrptzyi
cwgowxqobzhaefmslkjdrptzyi
cvgowxquwnhaefmulkjdrptbyi
nvgowxqmbnhaefmslyjdrptzyi
cvgowxqubniakvmslkjdrptzyi
cvyowxqubnhaefmslejdrptzyx
cvgobxqubghaefeslkjdrptzyi
cvgowxiubnhaebmslkjdfptzyi
cvgosbqubnhaefmslkvdrptzyi
cvgpwxqubnhaefvslkjdrptzyh
cvgowxqubnyaefmslgjdsptzyi
cvgowxqubnhaefmslkjdrprzzp
cvgowxqubwhaemmslkjdrpazyi
cvgowxqpbnhaemmslkjdrpczyi
cvgoqxqubnhaelmslkjdrptzye
cvgowxqubnhaefmslbjdrttzvi
cvgowxqubnhlefmslkvurptzyi
cvgowxqujngaefmslktdrptzyi
cvgowxqubnhaefmsckjdcwtzyi
cvcowxqubnhaetmslkjorptzyi
jvnowxqubnhaefmslkjdrptzyf
cygowxqkbnhaefmslejdrptzyi
cvmowxqubnhaefmslkjdritzoi
cvgowxqubnpaefmslkjdrpnnyi
cvgowxqubnhaefmolkjdrpnzyy
uvgowxoubnhaefmslkjdrptzvi
cvgowxbabehaefmslkjdrptzyi
cvgokxqubnhaefmsckjdrjtzyi
cvgoxwqubahaefmslkjdrptzyi
cvgowxqusnhaefmslijdrptyyi
cvgowxqubmhaeqmslkxdrptzyi
cvgouxhubnhaefmslkjdrjtzyi
cvgowxqubnhaefmslrjdqptzyk
cvgowxiublhaefsslkjdrptzyi
cvgowxqubnxgefmslkadrptzyi
ovgowxqugshaefmslkjdrptzyi
cvgowxquznhaeemslsjdrptzyi
cvkowxqubnhaeomslkjdeptzyi
cvgvwxqubxhaefmslkjdrptzyu
cvglwxqybnhaefmslkjdrptzyb
cvgowxqubnlfwfmslkjdrptzyi
cvaowxqubnhaefmslkjdrvtzbi
cvgowxqubnrmefaslkjdrptzyi
cvgowxqubnhaefmsnkjdfpwzyi
cvgawxqmbnhaefmsykjdrptzyi
chgowmqubnhaefmslkjdrptwyi
cogowxqubnhaefmslkjxrptzri
cvgohxqubnoaesmslkjdrptzyi
cvdowxqubnhaofmslkjdrpvzyi
vvgowrqubnhaefmslkjdrpthyi
cvgowxquknhuefmslkjdoptzyi
cvyowxeubnhaefmslhjdrptzyi
cvglwxqubnhaefmslkjdrptdyq
cvgowxqubnhaefmsikgdrptayi
cvgowxqubnhaefjhlkjdrpczyi
cvgzwxkubnhaefmslkjdjptzyi
cxgowxqubnhaefmslkjdrptwyy
cvgowxqubnhaefeslkjdrmqzyi
cvgowxvubnhaefmilijdrptzyi
cvgowxqzbthaeomslkjdrptzyi
cvgowhqubndaefmglkjdrptzyi
cvgowxvubnhaeamylkjdrptzyi
cvgowiqubnhgefmslkjdrctzyi
cvgowxqubchaefmslksdritzyi
cvgowxqubnhaefmsnkjdreyzyi
cvgowxqubihaefmslkgdrutzyi
cvgowxqjbnhaeamslkjdrptzwi
cvgowxzubnhaefmsxkjdrrtzyi
cvgowxqubyhaetmslnjdrptzyi
cvgowxquhnhaebmslkjdxptzyi
cvgowxqubnhanfmslujdxptzyi
cvgowxqublhnefaslkjdrptzyi
cvgmwxqtbnhaefmslkjsrptzyi
jvgowxqubnhaeamslkjdrpmzyi
cvgowxqubhiaefmsljjdrptzyi
svgowxqubnhaefmswkjdrpozyi
cvgowxqebnhaeqmslkjdiptzyi
cveowxqubnhayzmslkjdrptzyi
cvglwxqubnhaefmxlkjdiptzyi
cvgowkqubdhaefmszkjdrptzyi
cvgowxkxbnhaeffslkjdrptzyi
cugowxqubnnaefmslujdrptzyi
cqgowxwubnhaepmslkjdrptzyi
cvgowxqubnhayfmmlkjwrptzyi
cvgowxquenhaefmsskxdrptzyi
cvgowxqubnhiefmsrkjdtptzyi
mvgowxkubnhaefmjlkjdrptzyi
cvgowkquunhaefmglkjdrptzyi
cvgowxqubqhaexmslgjdrptzyi
jvgowxqubnhaefmslkjddptlyi
cvgiwxqubnhaefmslkjdpptmyi
czgowxqubntaevmslkjdrptzyi
cvgotmqubnhaefmslkjdrpazyi
cvgowxtubnhaefmslkqdtptzyi
cvbowxqhnnhaefmslkjdrptzyi
cvgowkqubshaefmstkjdrptzyi
cvgowqqrbnaaefmslkjdrptzyi
cvgoixqubnhaefmslkjdrpmryi
cvgoxxqubnhaeimsxkjdrptzyi
cvgowxqubzhaebmslkjyrptzyi
cjgewxqubnhaefsslkjdrptzyi
cvgowxqdbnkaefmslwjdrptzyi
cvgowxqzbnhaeamslkjdrftzyi
cvgoixqubnsaewmslkjdrptzyi
cvgswxqubnhaxfmslkjdrptzni
cvwowxmubnhgefmslkjdrptzyi
cvggwxqubnhaefmslqjdbptzyi
cvgzwxqjbnhaefaslkjdrptzyi
cvgowzqubnharfmspkjdrptzyi
cvgowxqubnhawfmslkjdeptzyb
cvuowequbnhaefmslkjdrntzyi
gvgowxqubnxaefmslkjdrjtzyi
cvgowxqubnhmetmsldjdrptzyi
cvgowxqubnhamfmsqkjdrptyyi
cvgoqxqubnhaefmslkjtrpazyi
cvgoexqubhhaefmslkjdrhtzyi
cvgowwqubnhaeflslkjdrptzyf
cvgowlpubnhaefmslkjdrptvyi
cvgowxouunhaebmslkjdrptzyi
cvdowhqubnhaefmslijdrptzyi
cvgowxqubnkatfmslkjdrhtzyi
cvgowxqpbnhxeumslkjdrptzyi
cvgowxqubnhaefmsukjjrptzyn
cvgowxqubnhmefmslzjdrvtzyi
cvtowxqubihaefmclkjdrptzyi
chgowcqubnhayfmslkjdrptzyi
cvguwxqubnhaefmblkjarptzyi
cvgowoqubnhaefmsikjdrytzyi
cvgkwxqubnhaefmslkjdrptchi
cvhowxqubnhaefmslkjdrvlzyi
cvlowxfubnhaefmslkjkrptzyi
cvgowxqubhhaefoslkjdrytzyi
cvgowxsubqhaefmslpjdrptzyi
cvgowxpubnhaefmslhjdrptzyb
cvgowxqubnhrefmjlkddrptzyi
cvgowxqubnhaxfmykkjdrptzyi
mvgowxqubnhakfmslkjdrptnyi
cwgowxqubnhaffmslkadrptzyi
chgowxquwnhaefmslsjdrptzyi
cvgowxqubnhaefmslkjdwpnsyi
cvgawxqubnhaefmslkldyptzyi
cvgowxqubnhiefmslkjdiprzyi
cvgkqxqubnhaefcslkjdrptzyi
cvgovoqubnhaefmslkjdrpuzyi
cvgowxqubnhaefmszkjdrjtzyk
cvgopxqubnhaefmslkjdqpnzyi
cvgtwxqubnhaefmslkjnrptzri
cvgowxqurnhaedmslfjdrptzyi
cvpowxqubnhaefmswkjdrltzyi
cvgowxqujnpaefmslkjdrptdyi
cvgowgqubnhzifmslkjdrptzyi
lvgowxqubnhaenmslkjdbptzyi
ebgowxqubnhaeymslkjdrptzyi
cvgowxtubqhaefmslkedrptzyi
cvgowxqubshaesmslkjdrptryi
cvgowxqubnhaefmflkjmrpkzyi
cvgowxqubngaefmslkjdrytzgi
cvgowxqubnhaefmslklhzptzyi
cveowxqubnhgefmslkjdrpezyi
cvgowxqubnhaeomslkjdrqtzym
cvgowxqubzhaefmslwjdrptfyi
cmgowxqubnhaefmsdkjdrptzui
cvlowxqubnhaefmslsjdrptzwi
cvhowxpubnhaefmslkjhrptzyi
cveosxqurnhaefmslkjdrptzyi
cvgowxqubnhaefgsdkjdrptjyi
cvgvwxqubnhaefmslzjdmptzyi
cviowxqubnhalfmslkjdrptzyr
cvgowxqubchqefmslkjdrptzoi
cvgownqubnhaefmsyktdrptzyi
cvgywxqubnuaefmslkjdrpfzyi
cvgobxqunnhaefmslkjdrptzbi
cvgowxqubshaefgslkjdrxtzyi
cvghwxqubnhaefmslkjdrbtmyi
cvhowxqubnhaefmslkjdrpnzys
cvgowxqubnmaefmslejdrptzyq
cvmrwxqubnhaefmslkjdrpzzyi
cvgowxqubshaefmslkfdrptzyu
cvgowqqubnhaefmslkodrpjzyi
cvgnwnquknhaefmslkjdrptzyi
cvgowxquxnhacfmflkjdrptzyi
ovgowxqubnhaefmslkjmrmtzyi
cvgowxqubneaefmslkedrptzqi
cvgowxqubphweflslkjdrptzyi
cvgowxqudnhaefmplkjdrptdyi
cvwowxbubnhaefmslkjurptzyi
cvgowxtubnhaefmslkjdrwwzyi
cvgowxqubnhkefmslajdrptzyn
cvgowxqxbphaefmslkjdrptzsi
cvgowxquenhaefmslmjwrptzyi
zvgowdqubnhaeftslkjdrptzyi
csgowxqubnhgefmslkjdrptzyy
cvgolxqubahaefmslkjdrpvzyi
cvgoqxquhwhaefmslkjdrptzyi
cvgawxqubghaefmsrkjdrptzyi
cvgozxqubnhaefmslkwdfptzyi
cvgowxqubnhaefmslhjdkptzzi
cvnowxqubnhaefmsqkjdrptqyi
cvpowxqubnhaefmslkpdrptdyi
cvgowxoubnhaermslkjdrctzyi
cvgowxqubnheefmslkjdrctzyr
cvgowxqunnhaqfhslkjdrptzyi
cvgowxqulnhaefmslrjdrntzyi`;
