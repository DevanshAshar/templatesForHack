import { Button, Flex, Heading, Highlight, Text, VStack } from '@chakra-ui/react'

const Divider = ({ children }) => {
    return (
        <div className="container">
            <div className="border" />
            <span className="content">
                {children}
            </span>
            <div className="border" />
        </div>
    );
};


export default function Form4(props) {

    const dealingWithRole = (flag) => {
        if(flag==0){
            props.setRole("Recruiter")
        }else{
            props.setRole("Employee")
        }
    }

    return (
        <>
            <Heading
                textAlign={"center"}
                fontSize={{ sm: "2xl", md: "4xl", lg: "5xl", xl: "5xl" }}
                mb="5%"
            >
                I am here ...
            </Heading>

            <VStack w='100%'>
                <Button height={'160px'} w='61%' fontSize={'40px'} rounded='3xl' onClick={()=>{dealingWithRole(0)}} >
                To Hire
            </Button>
            <Flex align="center" variant="dashed">
                <Divider borderColor={'green'} >
                    <Text padding="2" fontSize={'29px'}>
                        <Highlight
                            query={['OR']}
                            styles={{ px: '2', py: '1', rounded: 'full', bg: 'teal.100' }}
                        >

                            OR
                        </Highlight>
                    </Text>
                </Divider>
            </Flex>

            <Button height={'160px'} w='61%' fontSize={'40px'} rounded='3xl' onClick={()=>{dealingWithRole(1)}}>
            To get hired
        </Button>
            </VStack >
        </>
    )
}
