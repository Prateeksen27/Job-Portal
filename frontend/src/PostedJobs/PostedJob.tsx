import { Tabs } from "@mantine/core"
import { activeJobs } from "../assets/Data/PostedJob"
import PostedJobCard from "./PostedJobCard"

const PostedJob = () => {
    return (
        <div className="w-full sm:w-1/3 lg:w-1/5 mt-5 px-3 sm:px-4">
            {/* Title */}
            <div className="text-xl sm:text-2xl font-semibold mb-5 text-white">
                Posted Job
            </div>

            {/* Tabs */}
            <Tabs autoContrast variant="pills" defaultValue="active" className="w-full">
                <Tabs.List className="[&_button[aria-selected='false']]:bg-mine-shaft-900 font-medium">
                    <Tabs.Tab value="active" className="!text-sm sm:!text-base">
                        Active
                    </Tabs.Tab>
                    <Tabs.Tab value="draft" className="!text-sm sm:!text-base ">
                        Draft
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="active" className="mt-4">
                    <div className="flex flex-col gap-4">
                        {
                            activeJobs.map((job,index)=>{
                                return(
                                    <PostedJobCard key={index} {...job} />
                                )
                            })
                        }
                    </div>
                </Tabs.Panel>
                <Tabs.Panel value="draft" className="mt-4">
                    Second panel
                </Tabs.Panel>
            </Tabs>
        </div>
    )
}

export default PostedJob
