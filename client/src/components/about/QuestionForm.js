import {VStack,Stack,Text,useBreakpointValue,FormControl,Input,Button, Textarea, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, useDisclosure} from '@chakra-ui/react';

export default function QuestionForm(){

    const { isOpen, onOpen, onClose } = useDisclosure()

    function validateName(value) {
        let error
        if (!value) {
          error = 'Name is required'
        } else if (value.toLowerCase() !== 'naruto') {
          error = "Jeez! You're not a fan 😱"
        }
        return error
    }
    return(
      <VStack
        w={'full'}
        h={'full'}
        justify={"center"}
        px={useBreakpointValue({ base: 4, md: 8 })}
        backgroundPosition="center"
        backgroundSize="cover"
      
      >
        <Text fontSize='4xl' fontWeight='bold' marginTop='100px' textAlign='left'>문의 하기</Text>
        <Stack align={"flex-start"} spacing={6} alignItems={"center"} whiteSpace={"pre-line"}>
            
            <FormControl id='question-form' isRequired>
                <Input placeholder='이름' marginBottom='20px' />
                
                <Input placeholder='이메일' marginBottom='50px'/>

                <Textarea h='340px' borderColor='black' placeholder='문의 내용을 남겨주세요'></Textarea>
            </FormControl>

            <Button type='submit' onClick={onOpen}>보내기</Button>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>문의가 정상적으로 등록되었습니다.</ModalHeader>
                
                  <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                  </ModalFooter>
                </ModalContent>
            </Modal>
        </Stack>
      </VStack>
    )
}