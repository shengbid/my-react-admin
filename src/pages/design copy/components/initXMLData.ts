export const initXML = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:activiti="http://activiti.org/bpmn" targetNamespace="http://www.chinacsci.com">
  <process id="myProcess" name="My process" isExecutable="true">
    <startEvent id="Event_0vmrjpl" name="开始">
      <outgoing>Flow_1wzoseh</outgoing>
    </startEvent>
    <sequenceFlow id="Flow_1wzoseh" sourceRef="Event_0vmrjpl" targetRef="Activity_1hl9wil" />
    <userTask id="Activity_1hl9wil">
      <incoming>Flow_1wzoseh</incoming>
    </userTask>
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_myProcess">
    <bpmndi:BPMNPlane id="BPMNPlane_myProcess" bpmnElement="myProcess">
      <bpmndi:BPMNShape id="Event_0vmrjpl_di" bpmnElement="Event_0vmrjpl">
        <omgdc:Bounds x="142" y="92" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="150" y="135" width="22" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_1wzoseh_di" bpmnElement="Flow_1wzoseh">
        <omgdi:waypoint x="178" y="110" />
        <omgdi:waypoint x="230" y="110" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Activity_15ya6tl_di" bpmnElement="Activity_1hl9wil">
        <omgdc:Bounds x="230" y="70" width="100" height="80" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>`
