import Card from '../../../components/Card'

const Jobs = () => {
  return (
    <div className="container mx-auto grid lg:grid-cols-2 place-items-start gap-6">
      {[0, 1, 2, 3, 4, 5, 6].map((e) => {
        return (
          <Card className="pt-8 w-full my-4">
            <div className="flex flex-col">
              <div className="flex flex-col w-full ">
                <div className="flex font-semibold text-lg items-center">
                  <h4 className=" flex-grow">One Billionth Prime Number</h4>
                  <div className="text-primary-700 text-2xl">1 ETH</div>
                </div>
                <div className="my-4">
                  <div className="flex pl-0 p-2 items-center mr-auto">
                    <img
                      src="https://avataaars.io/?avatarStyle=Circle&topType=WinterHat3&accessoriesType=Prescription01&hatColor=Red&facialHairType=MoustacheFancy&facialHairColor=Auburn&clotheType=Overall&clotheColor=Blue02&eyeType=Squint&eyebrowType=UnibrowNatural&mouthType=Sad&skinColor=Light"
                      style={{
                        maxWidth: 40,
                      }}
                    />
                    <div className="ml-3 text-secondary-500">
                      Vaibhav Chopra
                    </div>
                  </div>
                  <p className="my-4">
                    Help me find the one billionth prime number. I need it for
                    my elliptic curve cyptography research paper
                  </p>
                  <div className="flex justify-between">
                    <button data-button="btn-primary-700-md ">Take On</button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}

export default Jobs
